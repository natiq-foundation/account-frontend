"use server";

import { AyahsListResponseData } from "@ntq/sdk";
import { ayahController } from "@/connection";

export const getAyahs = async (
    offset: number,
    limit: number
): Promise<AyahsListResponseData> => {
    // TODO:‌update
    const response = await ayahController.list({
        params: { limit: limit } as any,
    });

    return response.data;
};
