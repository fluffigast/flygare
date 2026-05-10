#!/usr/bin/env python3
"""Download training data from Azure for model retraining."""

import json
import os
import xml.etree.ElementTree as ET
from urllib.request import urlopen, Request

BLOB_SAS = os.environ.get("BLOB_SAS", "")
KUDU_PASSWORD = os.environ.get("KUDU_PASSWORD", "")
BASE = "https://skistarscraper01.blob.core.windows.net/skistar-data"


def download_blob_data():
    """Download all forecast records from Azure Blob Storage."""
    url = f"{BASE}?restype=container&comp=list&prefix=forecast/&maxresults=5000&{BLOB_SAS}"
    data = urlopen(url).read().decode()
    root = ET.fromstring(data)
    blobs = [
        e.text
        for e in root.iter()
        if e.tag.endswith("Name") and e.text and e.text.startswith("forecast/")
    ]
    print(f"Found {len(blobs)} blobs")

    records = []
    for i, blob in enumerate(blobs):
        try:
            resp = urlopen(f"{BASE}/{blob}?{BLOB_SAS}", timeout=10)
            for line in resp.read().decode().strip().split("\n"):
                if line.strip():
                    records.append(json.loads(line))
        except Exception:
            pass
        if (i + 1) % 500 == 0:
            print(f"  {i + 1}/{len(blobs)}")

    with open("/tmp/blob-data.jsonl", "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"Downloaded {len(records)} blob records")


def download_jsonl_pairs():
    """Download training pairs from web app persistent storage."""
    url = "https://vindare.scm.azurewebsites.net/api/vfs/data/training-pairs.jsonl"
    req = Request(url)
    req.add_header("Authorization", f"Basic {_basic_auth()}")
    try:
        data = urlopen(req, timeout=30).read()
        with open("/tmp/training-pairs.jsonl", "wb") as f:
            f.write(data)
    except Exception as e:
        print(f"JSONL download failed: {e}")
        with open("/tmp/training-pairs.jsonl", "w") as f:
            f.write("")


def _basic_auth():
    import base64
    creds = f"$vindare:{KUDU_PASSWORD}"
    return base64.b64encode(creds.encode()).decode()


if __name__ == "__main__":
    download_blob_data()
    download_jsonl_pairs()
