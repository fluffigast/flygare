import React from "react";
import { Link } from "react-router";
import { cn } from "../utils/cn";
import Separator from "./separator";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath = "/news",
  onPageChange,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  };

  const renderPageNumber = (page: number) => {
    const isActive = page === currentPage;
    const content = (
      <span
        className={cn(
          "transition-colors",
          isActive
            ? "font-bold text-foreground"
            : "font-normal text-foreground hover:text-primary"
        )}
      >
        {page}
      </span>
    );

    if (onPageChange) {
      return (
        <button
          onClick={(e) => handlePageClick(page, e)}
          className="cursor-pointer"
          aria-label={`Go to page ${page}`}
          aria-current={isActive ? "page" : undefined}
        >
          {content}
        </button>
      );
    }

    return (
      <Link
        to={getPageUrl(page)}
        className="cursor-pointer"
        aria-label={`Go to page ${page}`}
        aria-current={isActive ? "page" : undefined}
      >
        {content}
      </Link>
    );
  };

  const renderPrevious = () => {
    const content = (
      <span
        className={cn(
          "transition-colors",
          isFirstPage
            ? "text-muted-foreground cursor-not-allowed"
            : "text-foreground hover:text-primary cursor-pointer"
        )}
      >
        Föregående sida
      </span>
    );

    if (onPageChange) {
      return (
        <button
          onClick={(e) => !isFirstPage && handlePageClick(currentPage - 1, e)}
          disabled={isFirstPage}
          className="disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          {content}
        </button>
      );
    }

    if (isFirstPage) {
      return <span className="cursor-not-allowed">{content}</span>;
    }

    return (
      <Link to={getPageUrl(currentPage - 1)} aria-label="Previous page">
        {content}
      </Link>
    );
  };

  const renderNext = () => {
    const content = (
      <span
        className={cn(
          "transition-colors",
          isLastPage
            ? "text-muted-foreground cursor-not-allowed"
            : "text-foreground hover:text-primary cursor-pointer"
        )}
      >
        Nästa sida
      </span>
    );

    if (onPageChange) {
      return (
        <button
          onClick={(e) => !isLastPage && handlePageClick(currentPage + 1, e)}
          disabled={isLastPage}
          className="disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          {content}
        </button>
      );
    }

    if (isLastPage) {
      return <span className="cursor-not-allowed">{content}</span>;
    }

    return (
      <Link to={getPageUrl(currentPage + 1)} aria-label="Next page">
        {content}
      </Link>
    );
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      // Adjust start if we're near the end
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col gap-8 w-full">
      <Separator />
      <div className="flex items-center justify-center gap-8">
        {renderPrevious()}
        <div className="flex items-center gap-4">
          {pageNumbers.map((page) => (
            <React.Fragment key={page}>{renderPageNumber(page)}</React.Fragment>
          ))}
        </div>
        {renderNext()}
      </div>
      <Separator />
    </div>
  );
};

export default Pagination;
