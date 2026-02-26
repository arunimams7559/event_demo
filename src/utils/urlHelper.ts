import * as base64js from 'base64-js';

export interface EventData {
    templateId: string;
    gifts: string[];
    names: string;
    date: string;
    hostName: string;
    description?: string;
}

export const encodeEventData = (data: EventData): string => {
    const jsonString = JSON.stringify(data);
    const bytes = new TextEncoder().encode(jsonString);
    return base64js.fromByteArray(bytes)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

export const decodeEventData = (encoded: string): EventData | null => {
    try {
        // Restore padding and standard base64 characters
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4 !== 0) {
            base64 += '=';
        }
        const bytes = base64js.toByteArray(base64);
        const jsonString = new TextDecoder().decode(bytes);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Failed to decode event data:', error);
        return null;
    }
};
