export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export interface FileWithCode extends Error {
	code?: string;
}

export function isFileWithCode(error: unknown): error is FileWithCode {
	return typeof error === 'object' && error !== null && 'code' in error;
}
