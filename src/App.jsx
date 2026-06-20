import { StringSeection } from "./components/StringSeection";

const App = () => {
    return (
        <main>
            <section className="h-screen w-full bg-black flex items-center justify-center">
                <span className="text-white/80 text-7xl tracking-[0.2em] uppercase">Scroll to Know</span>
            </section>
            <StringSeection />
            <section className="h-screen w-full bg-black flex items-center justify-center">
                <span className="text-white/80 text-7xl tracking-[0.2em] uppercase">Scroll BAck</span>
            </section>
        </main>
    );
};

export default App;
