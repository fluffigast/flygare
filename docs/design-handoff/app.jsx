// app.jsx — hash router + mount

function parseHash() {
  const h = window.location.hash.replace(/^#/, "") || "/";
  // patterns: /, /information, /nyheter, /nyhet/<slug>, /startplats/<slug>, /om, /medlem
  const parts = h.split("#")[0].split("/").filter(Boolean);
  if (parts.length === 0) return { page: "home" };
  if (parts[0] === "information") return { page: "information" };
  if (parts[0] === "nyheter") return { page: "nyheter" };
  if (parts[0] === "nyhet" && parts[1]) return { page: "news", slug: parts[1] };
  if (parts[0] === "startplats" && parts[1]) return { page: "takeoff", slug: parts[1] };
  if (parts[0] === "om") return { page: "om" };
  if (parts[0] === "medlem") return { page: "medlem" };
  return { page: "home" };
}

function App() {
  const [route, setRoute] = React.useState(parseHash());

  React.useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (target) => {
    if (target.startsWith("#")) {
      window.location.hash = target.slice(1);
    } else {
      window.location.hash = target;
    }
  };

  let content;
  switch (route.page) {
    case "home":         content = <HomePage navigate={navigate} />; break;
    case "information":  content = <InformationPage navigate={navigate} />; break;
    case "nyheter":      content = <NyheterPage navigate={navigate} />; break;
    case "news":         content = <SingleNewsPage slug={route.slug} navigate={navigate} />; break;
    case "takeoff":      content = <SingleTakeoffPage slug={route.slug} navigate={navigate} />; break;
    case "om":           content = <StubPage title="Om klubben" navigate={navigate} />; break;
    case "medlem":       content = <StubPage title="Bli medlem" navigate={navigate} />; break;
    default:             content = <HomePage navigate={navigate} />;
  }

  return (
    <div className="page" key={route.page + (route.slug || "")}>
      <Topbar route={route} navigate={navigate} />
      {content}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
