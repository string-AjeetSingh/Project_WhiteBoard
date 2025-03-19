

function BlurPanel({ children, onClick }) {

    return (
        <>
            <div onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
            }}
                className="absolute top-0 bg-transLightPanel  dark:bg-transDarkPanel
                 w-full h-[500px] border flex flex-row justify-center items-center">
                {children}
            </div>
        </>
    );
}





export { BlurPanel }