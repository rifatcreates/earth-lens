import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Clock, MapPin, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useStore } from "@/store/useStore";
import type { Location } from "@/types";
import { MIN_SEARCH_LENGTH } from "@/constants/api";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);

  const { cities, isLoading, error, debouncedQuery } = useCitySearch(query);

  const recentSearches = useStore((state) => state.recentSearches);
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);
  const addRecentSearch = useStore((state) => state.addRecentSearch);
  const clearRecentSearches = useStore((state) => state.clearRecentSearches);

  const trimmedQuery = query.trim();

  const showRecent = trimmedQuery.length < MIN_SEARCH_LENGTH;
  const isWaiting = trimmedQuery !== debouncedQuery;

  const searchResults: Location[] = cities.map((city) => ({
    name: city.name,
    country: city.country ?? "",
    region: city.admin1,
    lat: city.latitude,
    lon: city.longitude,
  }));

  const filteredRecent = recentSearches.filter((item) =>
    item.name.toLowerCase().includes(trimmedQuery.toLowerCase())
  );

  const items: Location[] = showRecent ? filteredRecent : searchResults;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  }

  function selectLocation(location: Location) {
    setSelectedLocation(location);
    addRecentSearch(location);
    setQuery("");
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (event.key === "Enter") {
      if (activeIndex >= 0 && items[activeIndex]) {
        selectLocation(items[activeIndex]);
      } else if (!showRecent && items.length > 0) {
        selectLocation(items[0]);
      }
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

    function renderStatus() {
    if (showRecent) {
      if (recentSearches.length === 0) {
        return "Type at least 3 letters to search a city.";
      }
      if (trimmedQuery.length > 0 && filteredRecent.length === 0) {
        return "Type at least 3 letters to search a city.";
      }
      if (trimmedQuery.length > 0) {
        return "Type at least 3 letters to search more cities.";
      }
      return null;
    }

    if (isLoading || isWaiting) {
      return "Searching...";
    }
    if (error) {
      return "Could not search cities. Please try again.";
    }
    if (items.length === 0) {
      return "No city found.";
    }
    return null;
  }

  const status = renderStatus();

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search city..."
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Search city"
          className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-lg"
          >
            {showRecent && filteredRecent.length > 0 && (
              <div className="flex items-center justify-between px-4 pt-3 text-xs text-muted-foreground">
                <span>Recent searches</span>
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  className="hover:text-foreground"
                >
                  Clear
                </button>
              </div>
            )}

            {status && (
              <p className="px-4 py-3 text-sm text-muted-foreground">{status}</p>
            )}

            <ul role="listbox">
              {items.map((item, index) => (
                <li
                  key={`${item.lat}-${item.lon}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => selectLocation(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm ${
                    index === activeIndex ? "bg-muted" : ""
                  }`}
                >
                  {showRecent ? (
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {[item.region, item.country].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}