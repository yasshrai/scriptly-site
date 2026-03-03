"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiIntellijidea, SiPycharm, SiAndroidstudio } from "react-icons/si";
import { VscVscode, VscTerminalBash, VscCopy, VscCheck } from "react-icons/vsc";
import { IconType } from "react-icons";

interface IDE {
    id: string;
    name: string;
    icon?: IconType;
    image?: string;
    color: string;
    component: any;
    isAvailable: boolean;
}

const IDES: IDE[] = [
    {
        id: "vscode",
        name: "VS Code",
        icon: VscVscode,
        color: "#007ACC",
        component: lazy(() => import("@/docs/vscode.mdx")),
        isAvailable: true,
    },
    {
        id: "cursor",
        name: "Cursor",
        image: "/cursor.png",
        color: "#00A3FF",
        component: lazy(() => import("@/docs/cursor.mdx")),
        isAvailable: true,
    },
    {
        id: "intellij",
        name: "IntelliJ IDEA",
        icon: SiIntellijidea,
        color: "#FE315D",
        component: lazy(() => import("@/docs/intellij.mdx")),
        isAvailable: false,
    },
    {
        id: "pycharm",
        name: "PyCharm",
        icon: SiPycharm,
        color: "#21D789",
        component: lazy(() => import("@/docs/pycharm.mdx")),
        isAvailable: false,
    },
    {
        id: "android-studio",
        name: "Android Studio",
        icon: SiAndroidstudio,
        color: "#3DDC84",
        component: lazy(() => import("@/docs/android-studio.mdx")),
        isAvailable: false,
    },
];

const CodeBlock = ({ children, className, ...props }: any) => {
    const [copied, setCopied] = useState(false);
    const isInline = !className;

    const copyToClipboard = () => {
        const text = children.toString().replace(/^\$ /, "");
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isInline) {
        return <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-300" {...props}>{children}</code>;
    }

    return (
        <div className="group relative my-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <VscTerminalBash className="h-4 w-4 text-muted" />
                    <span className="text-xs font-medium text-muted uppercase tracking-wider font-sans">Terminal</span>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:bg-zinc-800 hover:text-white"
                >
                    {copied ? (
                        <>
                            <VscCheck className="h-3.5 w-3.5 text-green-500" />
                            Copied
                        </>
                    ) : (
                        <>
                            <VscCopy className="h-3.5 w-3.5" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-zinc-950 p-5 font-mono text-sm transition-all group-hover:bg-zinc-900/40 group-hover:border-zinc-800 overflow-x-auto">
                <code className="text-zinc-300" {...props}>
                    <span className="mr-2 text-zinc-600 select-none">$</span>
                    {children}
                </code>
            </div>
        </div>
    );
};

// Custom components for MDX
const components = {
    h1: (props: any) => <h1 className="text-4xl font-bold tracking-tight mb-4" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold tracking-tight mt-8 mb-4 border-b border-border pb-2" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold tracking-tight mt-6 mb-3" {...props} />,
    p: (props: any) => <p className="text-muted font-sans mt-1 leading-relaxed" {...props} />,
    code: CodeBlock,
    ul: (props: any) => <ul className="list-disc list-inside space-y-2 my-4 text-muted" {...props} />,
};

export default function InstallPage() {
    const [selectedIde, setSelectedIde] = useState(IDES[0]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const DocContent = selectedIde.component;

    return (
        <div className="flex min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-black/50 backdrop-blur-xl">
                <div className="flex h-full flex-col p-6">
                    <Link href="/" className="flex items-center gap-2 mb-10">
                        <Image
                            src="/logo.png"
                            alt="Scriptly Logo"
                            width={24}
                            height={24}
                            className="rounded-md"
                        />
                        <span className="text-lg font-bold tracking-tight text-white font-sans">Scriptly</span>
                    </Link>

                    <nav className="flex-1 space-y-2">
                        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted mb-4 font-sans">
                            Choose your IDE
                        </p>
                        {IDES.map((ide) => (
                            <button
                                key={ide.id}
                                onClick={() => ide.isAvailable && setSelectedIde(ide)}
                                disabled={!ide.isAvailable}
                                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${selectedIde.id === ide.id
                                    ? "bg-white text-black"
                                    : ide.isAvailable
                                        ? "text-muted hover:bg-zinc-900 hover:text-white cursor-pointer"
                                        : "text-zinc-700 cursor-not-allowed"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {ide.image ? (
                                        <Image
                                            src={ide.image}
                                            alt={ide.name}
                                            width={20}
                                            height={20}
                                            className={`h-5 w-5 rounded ${selectedIde.id === ide.id ? "" : "opacity-70"}`}
                                        />
                                    ) : ide.icon ? (
                                        <ide.icon
                                            className="h-5 w-5"
                                            style={{ color: selectedIde.id === ide.id ? "inherit" : ide.isAvailable ? ide.color : "#3f3f46" }}
                                        />
                                    ) : null}
                                    {ide.name}
                                </div>
                                {!ide.isAvailable && (
                                    <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50">Soon</span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-border">
                        <a
                            href="https://github.com/yasshrai/scriptly"
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
                        >
                            <SiGithub className="h-4 w-4" />
                            GitHub Repository
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 lg:p-12">
                <div className="mx-auto max-w-4xl pt-12">
                    <div className="mb-12">
                        <div
                            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-border mb-6 overflow-hidden"
                            style={{ boxShadow: `0 0 30px -5px ${selectedIde.color}60` }}
                        >
                            {selectedIde.image ? (
                                <Image
                                    src={selectedIde.image}
                                    alt={selectedIde.name}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 object-contain"
                                />
                            ) : selectedIde.icon ? (
                                <selectedIde.icon className="h-10 w-10" style={{ color: selectedIde.color }} />
                            ) : null}
                        </div>
                        <div className="prose prose-invert max-w-none">
                            {isLoaded && (
                                <Suspense fallback={<div className="animate-pulse h-64 bg-zinc-900/50 rounded-3xl" />}>
                                    <DocContent components={components} />
                                </Suspense>
                            )}
                        </div>
                    </div>

                    <div className="mt-16 rounded-3xl bg-gradient-to-br from-zinc-900/50 to-black p-8 border border-border relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110">
                            <VscTerminalBash className="h-24 w-24" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <VscTerminalBash className="h-6 w-6 text-blue-500" />
                                Script Details
                            </h2>
                            <p className="text-muted font-sans text-sm leading-relaxed max-w-2xl">
                                Each script is standalone and handles dependencies, extraction from official archives,
                                and symlinking automatically. No external package managers are required, ensuring
                                you always get the official version directly from the vendor.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
