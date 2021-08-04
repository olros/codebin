import { useState, useEffect } from 'react';

/**
 * Trigger the Web Share API.
 * If the Web Share API isn't supported, it copies the content to clipboard.
 *
 * @param shareData Content to be shared
 */
export const useShare = (shareData: globalThis.ShareData, onShare?: () => void) => {
  const [hasShared, setShared] = useState(false);

  useEffect(() => {
    if (hasShared) {
      const timeoutId = setTimeout(() => setShared(false), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [hasShared]);

  /**
   * Copies text to the clipboard
   * @param text Text which should be copied to clipboard
   */
  const copyToClipboard = async (text: string) => {
    const { default: copyToClipboard } = await import('copy-to-clipboard');
    const hasCopied = copyToClipboard(text);
    setShared(hasCopied);
  };

  /**
   * Triggers the Share functionality of your device if available.
   * Falls back to copying the content to the clipboard if not supported
   */
  const share = () => {
    const fallbackCopyText = shareData.url || shareData.text || shareData.title || '';
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => setShared(true))
        .catch(() => copyToClipboard(fallbackCopyText));
    } else {
      copyToClipboard(fallbackCopyText);
    }
    if (onShare) {
      onShare();
    }
  };

  return { share, hasShared };
};
