'use client';

import { useCallback, useState } from 'react';
import { toPng, toSvg } from 'html-to-image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LOGO_EXPORT_TARGET_ID } from '@/lib/logo-editor';
import { FiDownload } from 'react-icons/fi';
import { toast } from 'sonner';

const items = [
  { label: 'Download PNG', value: 'PNG' },
  { label: 'Download SVG', value: 'SVG' },
] as const;

type DownloadValue = (typeof items)[number]['value'];

const DOWNLOAD_FILENAME = 'logo-fast';

const createDownloadLink = (href: string, filename: string) => {
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function Downloads() {
  const [selected, setSelected] = useState<DownloadValue | undefined>(
    undefined,
  );

  const handleDownload = useCallback(async (value: DownloadValue) => {
    const targetNode = document.getElementById(LOGO_EXPORT_TARGET_ID);

    if (!targetNode) {
      toast.error('Could not find the logo canvas to export.');
      return;
    }

    try {
      if (value === 'PNG') {
        const dataUrl = await toPng(targetNode, {
          cacheBust: true,
          pixelRatio: 2,
        });

        createDownloadLink(dataUrl, `${DOWNLOAD_FILENAME}.png`);
        return;
      }

      const dataUrl = await toSvg(targetNode, {
        cacheBust: true,
      });

      createDownloadLink(dataUrl, `${DOWNLOAD_FILENAME}.svg`);
    } catch {
      toast.error('Export failed. Please try again.');
    }
  }, []);

  const handleSelect = useCallback(
    (value: DownloadValue) => {
      setSelected(value);
      void handleDownload(value);
      requestAnimationFrame(() => setSelected(undefined));
    },
    [handleDownload],
  );

  return (
    <Select value={selected} onValueChange={handleSelect}>
      <SelectTrigger className="max-w-38 w-full px-4 py-6 text-black data-[placeholder]:text-black">
        <SelectValue placeholder="Downloads" />
      </SelectTrigger>
      <SelectContent side="bottom" position="popper" className="p-2">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="px-4 py-3"
            >
              <span className="flex items-center gap-2">
                <FiDownload className="size-4" aria-hidden="true" />
                {item.label}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
