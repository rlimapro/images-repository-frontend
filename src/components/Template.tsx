interface TemplateProps {
    children: React.ReactNode
}

const Template = (props : TemplateProps) => {
    return (
        <>
            <Header/>

            {/* main content */}
            <div className="container mx-auto mt-8 px-4">
                {props.children}
            </div>
            
            <Footer/>
        </>
    );
}

export default Template;

const Header = () => {
    return (
        <header className="bg-indigo-950 text-white py-3">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-3x1 font-bold">ImageLite</h1>
            </div>
        </header>
    );
}

const Footer = () => {
    return (
        <footer className="bg-indigo-950 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                Desenvolvido por <a href="http://github.com/rlimapro" target="_blank">Rian Lima</a>
            </div>
        </footer>
    );
}