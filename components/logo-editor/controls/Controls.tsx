'use client';

import { useState } from 'react';
import Slider from '../../ui/slider';
import IconsMenu from './IconsMenu';
import ColorPickerNoSSR from './ColorPickerNoSSR';
import { useLogoIconComponent } from '@/hooks/use-logo-icon-component';
import useIconStore from '@/lib/store/iconStore';
import useIconBackgroundStore from '@/lib/store/iconBackgroundStore';

const SHADOW_OPTIONS = ['NONE', 'SM', 'MD', 'LG', 'XL', '2XL'];

const Controls = () => {
  const iconSize = useIconStore((state) => state.size);
  const setIconSize = useIconStore((state) => state.setSize);
  const selectedIconId = useIconStore((state) => state.selectedIconId);
  const setSelectedIconId = useIconStore((state) => state.setSelectedIconId);
  const iconRotate = useIconStore((state) => state.rotate);
  const setIconRotate = useIconStore((state) => state.setRotate);
  const iconBorderWidth = useIconStore((state) => state.borderWidth);
  const setIconBorderWidth = useIconStore((state) => state.setBorderWidth);
  const iconBorderColor = useIconStore((state) => state.borderColor);
  const setIconBorderColor = useIconStore((state) => state.setBorderColor);
  const iconFillOpacity = useIconStore((state) => state.fillOpacity);
  const setIconFillOpacity = useIconStore((state) => state.setFillOpacity);
  const iconFillColor = useIconStore((state) => state.color);
  const setIconFillColor = useIconStore((state) => state.setColor);

  const backgroundRounded = useIconBackgroundStore((state) => state.rounded);
  const setBackgroundRounded = useIconBackgroundStore(
    (state) => state.setRounded,
  );
  const backgroundPadding = useIconBackgroundStore((state) => state.padding);
  const setBackgroundPadding = useIconBackgroundStore(
    (state) => state.setPadding,
  );
  const backgroundShadowIndex = useIconBackgroundStore((state) => state.shadow);
  const setBackgroundShadowIndex = useIconBackgroundStore(
    (state) => state.setShadow,
  );
  const backgroundColor = useIconBackgroundStore((state) => state.bgColor);
  const setBackgroundColor = useIconBackgroundStore(
    (state) => state.setBgColor,
  );

  const [activePanel, setActivePanel] = useState<'icon' | 'background'>('icon');
  const [open, setOpen] = useState(false);
  const { Icon: SelectedIcon } = useLogoIconComponent(selectedIconId);

  const handleIconClick = () => {
    setActivePanel('icon');
  };

  const handleBackgroundClick = () => {
    setActivePanel('background');
  };

  return (
    <div className="max-h-[60dvh] min-h-0 flex flex-col overflow-hidden rounded-md border border-border p-3 lg:h-full lg:max-h-none lg:rounded-none lg:border-0 lg:border-r lg:p-5">
      <div className="flex shrink-0 gap-3 border-b border-border p-2">
        <button
          type="button"
          className={`hover:bg-gray-300 rounded p-2 ${
            activePanel === 'icon' ? 'bg-gray-300' : ''
          }`}
          onClick={handleIconClick}
        >
          Icon
        </button>
        <button
          type="button"
          className={`hover:bg-gray-300 rounded p-2 ${
            activePanel === 'background' ? 'bg-gray-300' : ''
          }`}
          onClick={handleBackgroundClick}
        >
          Background
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        {activePanel === 'background' ? (
          <div className="pt-2 pb-8">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center m-2">
                  <span>Rounded</span>
                  <span>{backgroundRounded}px</span>
                </div>
                <Slider
                  value={[backgroundRounded]}
                  onValueChange={([value]) => setBackgroundRounded(value)}
                  max={300}
                  min={0}
                  rangeClassName="bg-black"
                  step={1}
                  thumbClassName="rounded-none h-6 w-6 border-3 border-black bg-white cursor-pointer"
                  trackClassName="h-6 rounded-none cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between items-center m-2">
                  <span>Padding</span>
                  <span>{backgroundPadding}px</span>
                </div>
                <Slider
                  value={[backgroundPadding]}
                  onValueChange={([value]) => setBackgroundPadding(value)}
                  max={100}
                  min={0}
                  rangeClassName="bg-black"
                  step={1}
                  thumbClassName="rounded-none h-6 w-6 border-3 border-black bg-white cursor-pointer"
                  trackClassName="h-6 rounded-none cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between items-center m-2">
                  <span>Shadow</span>
                  <span>{SHADOW_OPTIONS[backgroundShadowIndex]}</span>
                </div>
                <Slider
                  value={[backgroundShadowIndex]}
                  max={SHADOW_OPTIONS.length - 1}
                  min={0}
                  rangeClassName="bg-black"
                  step={1}
                  thumbClassName="rounded-none h-6 w-6 border-3 border-black bg-white cursor-pointer"
                  trackClassName="h-6 rounded-none cursor-pointer"
                  aria-valuetext={SHADOW_OPTIONS[backgroundShadowIndex]}
                  onValueChange={([value]) =>
                    setBackgroundShadowIndex(Math.round(value))
                  }
                />
                <div className="mt-2 flex justify-between text-xs uppercase">
                  {SHADOW_OPTIONS.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      className={
                        index === backgroundShadowIndex
                          ? 'font-semibold text-foreground'
                          : 'text-muted-foreground'
                      }
                      onClick={() => setBackgroundShadowIndex(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-10 w-full">
                <p className="mb-2">Background color</p>
                <ColorPickerNoSSR
                  value={backgroundColor}
                  onChange={setBackgroundColor}
                  disableDarkMode={true}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-2 pb-8">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col justify-between gap-2">
                <span>Icon</span>
                <button
                  type="button"
                  aria-label="Open icon menu"
                  onClick={() => setOpen(true)}
                  className="group flex h-12 w-12 cursor-pointer items-center justify-center bg-gray-300 text-black transition-colors hover:text-gray-400"
                >
                  <SelectedIcon
                    size="80%"
                    className="transition-transform duration-150 group-hover:scale-105"
                  />
                </button>
              </div>
              <IconsMenu
                open={open}
                onOpenChange={setOpen}
                selectedIconId={selectedIconId}
                onSelectIcon={setSelectedIconId}
              />
            </div>
            <div>
              <div className="flex justify-between items-center m-2">
                <span>Size</span>
                <span>{iconSize}px</span>
              </div>
              <Slider
                value={[iconSize]}
                onValueChange={([value]) => setIconSize(value)}
                max={600}
                min={100}
                rangeClassName="bg-black"
                step={1}
                thumbClassName="rounded-none h-6 w-6 border-3 border-black bg-white cursor-pointer"
                trackClassName="h-6 rounded-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center m-2">
                <span>Rotate</span>
                <span>
                  {iconRotate}
                  <sup>&deg;</sup>
                </span>
              </div>
              <Slider
                value={[iconRotate]}
                onValueChange={([value]) => setIconRotate(value)}
                max={180}
                min={-180}
                rangeClassName="bg-black"
                step={1}
                thumbClassName="rounded-none h-6 w-6 border-3 border-black bg-white cursor-pointer"
                trackClassName="h-6 rounded-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center m-2">
                <span>Border width</span>
                <span>{iconBorderWidth}px</span>
              </div>
              <Slider
                value={[iconBorderWidth]}
                onValueChange={([value]) => setIconBorderWidth(value)}
                max={4}
                min={0}
                rangeClassName="bg-black"
                step={1}
                thumbClassName="rounded-none h-6 w-6 border-3 border-black bg-white cursor-pointer"
                trackClassName="h-6 rounded-none cursor-pointer"
              />
            </div>
            <div className="mt-10">
              <p className="mb-2">Border color</p>
              <ColorPickerNoSSR
                value={iconBorderColor}
                onChange={setIconBorderColor}
                hidePresets={true}
                hideControls={true}
              />
            </div>
            <div className="my-5">
              <div className="flex justify-between items-center m-2">
                <span>Fill opacity</span>
                <span>{iconFillOpacity}%</span>
              </div>
              <Slider
                value={[iconFillOpacity]}
                onValueChange={([value]) => setIconFillOpacity(value)}
                max={100}
                min={0}
                rangeClassName="bg-black"
                step={1}
                thumbClassName="rounded-none h-6 w-6 border-3 border-black bg-white cursor-pointer"
                trackClassName="h-6 rounded-none cursor-pointer"
              />
            </div>
            <div className="mt-10">
              <p className="mb-2">Fill color</p>
              <ColorPickerNoSSR
                value={iconFillColor}
                onChange={setIconFillColor}
                hidePresets={true}
                hideControls={true}
                hideOpacity={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
