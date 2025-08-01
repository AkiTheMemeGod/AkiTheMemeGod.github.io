import { useEffect, useRef, useState } from 'react';

const BOOT_LOGS = [
  '[    0.000000] Initializing cgroup subsys cpuset',
  '[    0.000000] Initializing cgroup subsys cpu',
  '[    0.000000] Initializing cgroup subsys cpuacct',
  '[    0.000000] Linux version 6.11.0-26-generic (buildd@lcy02-amd64-123) (gcc version 13.2.0) #20240601 SMP',
  '[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.11.0-26-generic root=UUID=xxxx ro quiet splash',
  '[    0.000000] KERNEL supported cpus:',
  '[    0.000000]   Intel GenuineIntel',
  '[    0.000000]   AMD AuthenticAMD',
  '[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: x87 floating point registers',
  '[    0.000000] x86/fpu: Supporting XSAVE feature 0x002: SSE registers',
  '[    0.000000] x86/fpu: Supporting XSAVE feature 0x004: AVX registers',
  '[    0.000000] BIOS-provided physical RAM map:',
  '[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable',
  '[    0.000000] BIOS-e820: [mem 0x0000000000100000-0x000000003fffffff] usable',
  '[    0.000000] NX (Execute Disable) protection: active',
  '[    0.000000] SMBIOS 2.8 present.',
  '[    0.000000] DMI: System manufacturer System Product Name/PRIME B450M-A, BIOS 1234 01/01/2024',
  '[    0.000000] e820: update [mem 0x00000000-0x00000fff] usable ==> reserved',
  '[    0.000000] e820: remove [mem 0x000a0000-0x000fffff] usable',
  '[    0.000000] AGP: No AGP bridge found',
  '[    0.000000] e820: last_pfn = 0x40000 max_arch_pfn = 0x400000000',
  '[    0.000000] MTRR default type: uncachable',
  '[    0.000000] MTRR fixed ranges enabled:',
  '[    0.000000]   00000-9FFFF write-back',
  '[    0.000000]   A0000-BFFFF uncachable',
  '[    0.000000]   C0000-FFFFF write-protect',
  '[    0.000000] ACPI: Early table checksum verification disabled',
  '[    0.000000] ACPI: RSDP 0x00000000000F0000 000024 (v02 DELL  )',
  '[    0.000000] ACPI: XSDT 0x000000003F7FE120 00005C (v01 DELL   CBX3     01072009 AMI  00010013)',
  '[    0.000000] ACPI: FACP 0x000000003F7FC000 00010C (v05 DELL   CBX3     01072009 AMI  00010013)',
  '[    0.000000] ACPI: DSDT 0x000000003F7F0000 00A6A4 (v02 DELL   CBX3     01072009 INTL 20120913)',
  '[    0.000000] ACPI: FACS 0x000000003F7E0000 000040',
  '[    0.000000] ACPI: APIC 0x000000003F7FD000 000062 (v01 DELL   CBX3     01072009 AMI  00010013)',
  '[    0.000000] ACPI: FPDT 0x000000003F7FB000 000044 (v01 DELL   CBX3     01072009 AMI  00010013)',
  '[    0.000000] ACPI: SSDT 0x000000003F7FA000 000372 (v01 DELL   CBX3     01072009 INTL 20120913)',
  '[    0.000000] ACPI: Local APIC address 0xfee00000',
  '[    0.000000] No NUMA configuration found',
  '[    0.000000] Faking a node at [mem 0x0000000000000000-0x000000003fffffff]',
  '[    0.000000] NODE_DATA(0) allocated [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] Zone ranges:',
  '[    0.000000]   DMA      [mem 0x0000000000001000-0x0000000000ffffff]',
  '[    0.000000]   DMA32    [mem 0x0000000001000000-0x000000003fffffff]',
  '[    0.000000]   Normal   empty',
  '[    0.000000] Movable zone start for each node',
  '[    0.000000] Early memory node ranges',
  '[    0.000000]   node   0: [mem 0x0000000000001000-0x000000003fffffff]',
  '[    0.000000] Initmem setup node 0 [mem 0x0000000000001000-0x000000003fffffff]',
  '[    0.000000] On node 0 totalpages: 262128',
  '[    0.000000]   DMA zone: 64 pages used for memmap',
  '[    0.000000]   DMA zone: 21 pages reserved',
  '[    0.000000]   DMA zone: 3998 pages, LIFO batch:0',
  '[    0.000000]   DMA32 zone: 3998 pages used for memmap',
  '[    0.000000]   DMA32 zone: 258130 pages, LIFO batch:31',
  '[    0.000000] ACPI: PM-Timer IO Port: 0x408',
  '[    0.000000] ACPI: Local APIC address 0xfee00000',
  '[    0.000000] IOAPIC[0]: apic_id 2, version 32, address 0xfec00000, GSI 0-23',
  '[    0.000000] Enabling APIC mode:  Flat.  Using 1 I/O APICs',
  '[    0.000000] Using ACPI (MADT) for SMP configuration information',
  '[    0.000000] smpboot: Allowing 8 CPUs, 0 hotplug CPUs',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] e820: [mem 0x40000000-0xffffffff] available for PCI devices',
  '[    0.000000] Booting paravirtualized kernel on bare hardware',
  '[    0.000000] clocksource: refined-jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 7645041785100000 ns',
  '[    0.000000] setup_percpu: NR_CPUS:320 nr_cpumask_bits:320 nr_cpu_ids:8 nr_node_ids:1',
  '[    0.000000] percpu: Embedded 54 pages/cpu s184320 r8192 d28672 u262144',
  '[    0.000000] pcpu-alloc: s184320 r8192 d28672 u262144 alloc=1*2097152',
  '[    0.000000] pcpu-alloc: [0] 0 1 2 3 4 5 6 7 ',
  '[    0.000000] Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 262043',
  '[    0.000000] Kernel command line: BOOT_IMAGE=/boot/vmlinuz-6.11.0-26-generic root=UUID=xxxx ro quiet splash',
  '[    0.000000] Dentry cache hash table entries: 131072 (order: 8, 1048576 bytes)',
  '[    0.000000] Inode-cache hash table entries: 65536 (order: 7, 524288 bytes)',
  '[    0.000000] Memory: 1024000K/1048576K available (12345K kernel code, 2345K rwdata, 5678K rodata, 1024K init, 2048K bss, 24576K reserved, 0K cma-reserved)',
  '[    0.000000] Write protecting the kernel text: 123456k',
  '[    0.000000] Write protecting the kernel read-only data: 5678k',
  '[    0.000000] Freeing unused kernel image (initmem) memory: 1024K',
  '[    0.000000] Freeing unused kernel image (text/rodata gap) memory: 2048K',
  '[    0.000000] Freeing unused kernel image (rodata/data gap) memory: 4096K',
  '[    0.000000] x86/mm: Checked W+X mappings: passed, no W+X pages found.',
  '[    0.000000] x86/mm: Checking user space page tables...',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x000a0000-0x000fffff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fff8000-0x3fffbfff]',
  '[    0.000000] PM: Registered nosave memory: [mem 0x3fffc000-0x3fffffff]',
  '[    0.000000] x86/mm: Checked W+X mappings: passed, no W+X pages found.',
  '[    0.000000] Run /init as init process',
  '[    0.000000] systemd[1]: systemd 245 running in system mode. (+PAM +AUDIT +SELINUX +IMA +APPARMOR +SMACK +SYSVINIT +UTMP +LIBCRYPTSETUP +GCRYPT +GNUTLS +ACL +XZ +LZ4 +SECCOMP +BLKID +ELFUTILS +KMOD +IDN2 +IDN +PCRE2 default-hierarchy=hybrid)',
  '[    0.000000] systemd[1]: Detected architecture x86-64.',
  '[    0.000000] systemd[1]: Set hostname to <ubuntu>',
  '[    0.000000] systemd[1]: Started Dispatch Password Requests to Console Directory Watch.',
  '[    0.000000] systemd[1]: Reached target Paths.',
  '[    0.000000] systemd[1]: Reached target Remote File Systems.',
  '[    0.000000] systemd[1]: Listening on Journal Socket.',
  '[    0.000000] systemd[1]: Starting Load Kernel Modules...',
  '[    0.000000] systemd[1]: Started Load Kernel Modules.',
  '[    0.000000] systemd[1]: Starting Remount Root and Kernel File Systems...',
  '[    0.000000] systemd[1]: Started Remount Root and Kernel File Systems.',
  '[    0.000000] systemd[1]: Starting Create Static Device Nodes in /dev...',
  '[    0.000000] systemd[1]: Started Create Static Device Nodes in /dev.',
  '[    0.000000] systemd[1]: Starting udev Kernel Device Manager...',
  '[    0.000000] systemd[1]: Started udev Kernel Device Manager.',
  '[    0.000000] systemd[1]: Starting Network Service...',
  '[    0.000000] systemd[1]: Started Network Service.',
  '[    0.000000] systemd[1]: Reached target Network.',
  '[    0.000000] systemd[1]: Starting Permit User Sessions...',
  '[    0.000000] systemd[1]: Started Permit User Sessions.',
  '[    0.000000] systemd[1]: Started Getty on tty1.',
  '[    0.000000] systemd[1]: Reached target Login Prompts.',
  '[    0.000000] systemd[1]: Started Hold until boot process finishes up.',
  '[    0.000000] systemd[1]: Reached target Multi-User System.',
  '[    0.000000] systemd[1]: Reached target Graphical Interface.',
  '[    0.000000] systemd[1]: Startup finished in 1.234s (kernel) + 2.345s (userspace) = 3.579s.',
];

const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com/AkiTheMemeGod' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/akash-k19052022/' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/ak6145/' },
];

const ABOUT = `Hi, I'm a passionate developer who loves building cool things with code. Welcome to my portfolio!`;

const COMMANDS = [
  { cmd: 'showcv', desc: 'Boot into the portfolio' },
  { cmd: 'help', desc: 'List all available commands' },
  { cmd: 'social', desc: 'Show my developer social links' },
  { cmd: 'about', desc: 'About me' },
  { cmd: 'clear', desc: 'Clear the terminal screen' },
];

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  text: string;
}

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

function getRandomMatrixLine(width: number) {
  let line = '';
  for (let i = 0; i < width; i++) {
    line += MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
  }
  return line;
}

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [mode, setMode] = useState<'terminal' | 'loading' | 'boot'>('terminal');
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([{
    type: 'output',
    text: 'Welcome to PortfolioOS [Version 1.0.0]'
  }, {
    type: 'output',
    text: 'Type help to see available commands.'
  }]);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [matrixLines, setMatrixLines] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (mode === 'terminal' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  // Scroll to bottom on new line
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, mode]);

  // Handle hackery loading animation
  useEffect(() => {
    if (mode !== 'loading') return;
    setLoadingProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 6; // random step for realism
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(progress);
        clearInterval(interval);
        setTimeout(() => setMode('boot'), 500);
      } else {
        setLoadingProgress(progress);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [mode]);

  // Handle boot log animation
  useEffect(() => {
    if (mode !== 'boot') return;
    let idx = 0;
    setVisibleLines([]);
    const interval = setInterval(() => {
      setVisibleLines((lines) => {
        const next = [...lines, BOOT_LOGS[idx]];
        idx++;
        if (idx >= BOOT_LOGS.length) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
        }
        return next;
      });
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 10);
    }, 25 + Math.random() * 30);
    return () => clearInterval(interval);
  }, [mode, onComplete]);

  // Handle terminal input
  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setLines((prev) => [...prev, { type: 'input', text: `$ ${input}` }]);
    setInput('');
    if (cmd === 'showcv') {
      setMode('loading');
    } else if (cmd === 'help') {
      setLines((prev) => [
        ...prev,
        { type: 'output' as const, text: 'Available commands:' },
        ...COMMANDS.map(c => ({ type: 'output' as const, text: `  ${c.cmd.padEnd(8)} - ${c.desc}` }))
      ]);
    } else if (cmd === 'social') {
      setLines((prev) => [
        ...prev,
        { type: 'output' as const, text: 'Social links:' },
        ...SOCIALS.map(s => ({ type: 'output' as const, text: `  ${s.name}: ${s.url}` }))
      ]);
    } else if (cmd === 'about') {
      setLines((prev) => [
        ...prev,
        { type: 'output' as const, text: ABOUT }
      ]);
    } else if (cmd === 'clear') {
      setLines([]);
    } else if (cmd === '') {
      // do nothing
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'error' as const, text: `command not found: ${cmd}` }
      ]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono flex items-center justify-center z-50">
      {mode === 'terminal' ? (
        <div className="w-full h-full bg-black p-0 flex flex-col justify-center items-center select-none">
          <div ref={containerRef} className="w-full h-full overflow-y-auto bg-black">
            <div className="flex flex-col gap-1 px-6 pt-8 pb-4">
              {lines.map((line, i) => {
                if (line.type === 'output' && line.text.match(/^  (GitHub|LinkedIn|HackerRank): /)) {
                  // Render social links as clickable
                  const match = line.text.match(/^  (GitHub|LinkedIn|HackerRank): (.+)$/);
                  if (match) {
                    const [_, name, url] = match;
                    return (
                      <pre key={i} className="text-green-500">
                        {'  '}
                        <span className="text-green-300">{name}:</span>{' '}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-green-400 hover:text-green-200 transition-colors"
                        >
                          {url}
                        </a>
                      </pre>
                    );
                  }
                }
                return (
                  <pre key={i} className={
                    line.type === 'error' ? 'text-red-500 animate-pulse' :
                    line.type === 'input' ? 'text-green-400' :
                    'text-green-500'
                  }>{line.text}</pre>
                );
              })}
            </div>
            <form onSubmit={handleInput} className="flex items-center px-6 pb-8">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                className="bg-black text-green-500 font-mono outline-none ml-2 flex-1 text-lg"
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                style={{ caretColor: '#22ff22' }}
              />
            </form>
          </div>
        </div>
      ) : mode === 'loading' ? (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center select-none relative">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-green-300 text-3xl md:text-5xl font-bold tracking-widest drop-shadow-lg animate-pulse mb-8" style={{letterSpacing: '0.2em'}}>
              Authorized
            </div>
            <div className="w-full max-w-md px-8">
              <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-100"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="mt-2 text-green-400 text-right text-xs">{Math.floor(loadingProgress)}%</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="w-full h-full bg-black p-6 overflow-y-hidden select-none"
        >
          <pre className="text-xs leading-tight">
            {visibleLines.join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
