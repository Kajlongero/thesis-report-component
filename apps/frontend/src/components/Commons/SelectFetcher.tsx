import React, { useState, useRef, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Search, Loader2 } from "lucide-react";

export interface SelectOption {
  id: number;
  value: string;
  label: string;
  description?: string;
}

interface SelectWithInfiniteScrollProps {
  value: string;
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange: (value: string) => void;

  options: SelectOption[];
  hasMore: boolean;
  isLoading: boolean;
  isFetchingMore: boolean;
  onLoadMore: () => void;
}

export const SelectWithInfiniteScroll: React.FC<
  SelectWithInfiniteScrollProps
> = ({
  value,
  hasMore,
  options,
  className = "",
  isLoading,
  placeholder = "Select an option...",
  isFetchingMore,
  searchPlaceholder = "Search options...",
  onChange,
  onLoadMore,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { ref: intersectionRef, inView } = useInView({
    threshold: 0,
    skip: !isOpen || searchTerm.length > 0,
  });

  useEffect(() => {
    if (inView && hasMore && !isFetchingMore) onLoadMore();
  }, [inView, hasMore, isFetchingMore, onLoadMore]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(lowerSearchTerm) ||
        option.description?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [options, searchTerm]);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSearchChange = (newSearchTerm: string) =>
    setSearchTerm(newSearchTerm);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          className={
            selectedOption ? "text-foreground" : "text-muted-foreground"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 rounded-md border border-border bg-background shadow-lg">
          <div className="flex items-center border-b border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center px-3 py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                {searchTerm ? "No options found" : "No hay resultados"}
              </div>
            ) : (
              <>
                {filteredOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className="flex flex-col px-3 py-2 text-sm cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {option.description}
                      </span>
                    )}
                  </div>
                ))}
                {!searchTerm && hasMore && (
                  <div
                    ref={intersectionRef}
                    className="flex items-center justify-center px-3 py-4 h-16"
                  >
                    {isFetchingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">
                          Cargando más...
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Cargando más opciones...
                      </span>
                    )}
                  </div>
                )}
                {!searchTerm &&
                  !hasMore &&
                  !isLoading &&
                  options.length > 0 && (
                    <div className="px-3 py-2 text-xs text-muted-foreground text-center border-t border-border">
                      Has llegado al final
                    </div>
                  )}
                {searchTerm && hasMore && (
                  <div className="px-3 py-2 text-xs text-muted-foreground text-center border-t border-border">
                    Algunos resultados pueden no aparecer. Carga más datos para
                    búsquedas completas.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
