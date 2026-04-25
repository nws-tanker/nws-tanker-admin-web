import namaLogo from '@/assets/nama-logo.jpeg';

export function SidebarBrand() {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-5 pb-5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white p-1">
        <img
          src={namaLogo}
          alt="Nama"
          className="block h-full w-full object-contain"
        />
      </div>
      <div className="min-w-0">
        <div className="text-[15px] font-semibold leading-tight tracking-tight text-white">
          Permit Management
        </div>
        <div className="mt-0.5 text-[11px] text-white/55">
          Nama Water Services
        </div>
      </div>
    </div>
  );
}
