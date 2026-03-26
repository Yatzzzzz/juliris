import { Heebo, Libre_Franklin, Montserrat } from "next/font/google";

export const heebo = Heebo({
    subsets: ["hebrew", "latin"],
    variable: "--font-heebo",
});

export const libreFranklin = Libre_Franklin({
    subsets: ["latin"],
    variable: "--font-libre-franklin",
});

export const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});
