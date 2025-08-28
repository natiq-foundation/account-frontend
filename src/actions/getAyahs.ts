"use server";

import { ayahController } from "@/connection";
import { AyahsListResponseData } from "@ntq/sdk";

export const getAyahs = async (offset: number, limit: number): Promise<AyahsListResponseData> => {

    // TODO:‌update
    const response = await ayahController.list({ params: { limit: limit } as any });

    return response.data
}