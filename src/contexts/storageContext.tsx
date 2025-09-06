"use client";

import { ThemeColor, DarkStyle } from "@yakad/ui";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

// ----- 1. Types for each storage section -----
interface Settings {
    darkStyle: DarkStyle;
    themeColor: ThemeColor;
    zoom?: number; //Percentage zoom level (e.g., 100 for 100%)
    language: string;
}
interface Options {
    arabicFont: "test";
    arabicFontSize: "small" | "medium" | "large";
    translationFontSize: "small" | "medium" | "large";

    playing: boolean;
    playBoxShow: boolean;
    recitationStatus: boolean;
    ayahRepeat: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "infinite"; //times
    delay: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; //sec
    playBackRate: 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;
    limitMode:
        | "continuous"
        | "surah"
        | "ayah"
        | "juz"
        | "hizb"
        | "ruku"
        | "page"
        | "time";
    limitRange: number;
    limitRepeat: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "infinite"; //times
    autoScroll: boolean;
}
interface Selected {
    mushafUUID: string;
    ayahUUID: string | undefined;
    translationUUID: string;
    translationByWordUUID: string;
    recitationUUID: string;
}
// ----- 2. Combined Storage type -----
interface Storage {
    settings: Settings;
    options: Options;
    selected: Selected;
}

// ----- 3. Default values -----
const defaultStorage: Storage = {
    settings: {
        darkStyle: "system",
        themeColor: "green",
        zoom: 100,
        language: "en",
    },
    options: {
        arabicFont: "test",
        arabicFontSize: "medium",
        translationFontSize: "medium",

        playing: false,
        playBoxShow: false,
        recitationStatus: true,
        ayahRepeat: 0,
        delay: 0,
        playBackRate: 1,
        limitMode: "continuous",
        limitRange: 1,
        limitRepeat: 0,
        autoScroll: true,
    },
    selected: {
        mushafUUID: "hafs",
        ayahUUID: "test",
        translationUUID: "UUID",
        translationByWordUUID: "UUID",
        recitationUUID: "UUID",
    },
};

// ----- 4. Context value type -----
interface StorageContextType {
    storage: Storage;
    setStorage: Dispatch<SetStateAction<Storage>>;
}

// ----- 5. Create context -----
const StorageContext = createContext<StorageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "storage";

// ----- 6. Provider component -----
export const StorageProvider = ({ children }: { children: ReactNode }) => {
    const [storage, setStorage] = useState<Storage>(defaultStorage);

    // Load from localStorage on first render
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Partial<Storage>;
                setStorage((prev) => ({
                    ...prev,
                    ...parsed,
                    options: {
                        ...prev.options,
                        ...parsed.options,
                        playing: false, // force playing to false on load
                        playBoxShow: storage.selected.ayahUUID !== undefined,
                    },
                }));
            } catch (error) {
                console.error(
                    "Failed to parse storage from localStorage",
                    error
                );
            }
        }
    }, []);

    // Save to localStorage on storage change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
    }, [storage]);

    return (
        <StorageContext.Provider value={{ storage, setStorage }}>
            {children}
        </StorageContext.Provider>
    );
};

// ----- 7. Custom hook -----
export const useStorage = (): StorageContextType => {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error("useStorage must be used within a StorageProvider");
    }
    return context;
};
