import { downloadURI } from "./downloadURI";

/**
 * A very long, verbose, wordy, long-winded, tedious, verbacious, tautological,
 * profuse, expansive, enthusiastic, redundant, flowery, eloquent, articulate,
 * loquacious, garrulous, chatty, extended, babbling description.
 * @summary A concise summary.
 */
export function downloadTextFile(filename: string, text: string) {
  downloadURI(
    filename,
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
}
