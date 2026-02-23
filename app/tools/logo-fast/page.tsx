import Canva from '@/components/logo-editor/preview/Canva';
import Controls from '@/components/logo-editor/controls/Controls';
import RightBar from '@/components/RightBar';
import TopBar from '@/components/TopBar';

export default function LogoFastPage() {
  return (
    <div className="bg-background mx-auto flex min-h-dvh flex-col overflow-y-auto px-2 py-2 lg:h-dvh lg:overflow-hidden">
      <TopBar />
      <div className="grid grid-cols-1 gap-4 pb-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(280px,1fr)_minmax(0,2fr)_minmax(260px,0.7fr)] lg:overflow-hidden lg:pb-0">
        <div className="lg:min-h-0 lg:overflow-hidden">
          <Controls />
        </div>
        <div className="lg:min-h-0 lg:overflow-hidden">
          <Canva />
        </div>
        <div className="lg:min-h-0 lg:overflow-hidden">
          <RightBar />
        </div>
      </div>
    </div>
  );
}
