import { translationController } from "@/connection"

export const getTranslations = async (mushaf: string, language: string) => {
    return await translationController.list({params: {mushaf: mushaf, language: language}});
}

export const getTranslation = async (uuid: string) => {
    return await translationController.retrieve(uuid);
}

// export const getTranslationAyahs = async (translation_uuid: string) => {
    // return await translationController.ayah.list()
// }