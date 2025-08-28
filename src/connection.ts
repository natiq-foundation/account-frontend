import { Connection, AyahsController, TranslationController} from "@ntq/sdk";

export const connection = new Connection([
    new URL(process.env.REACT_APP_API_URL || "https://api.natiq.net"),
]);

export const ayahController = new AyahsController(connection);
export const translationController = new TranslationController(connection);