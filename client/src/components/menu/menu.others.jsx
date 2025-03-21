

function BlurPanel({ children, onClick, height }) {

    return (
        <>
            <div onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
            }}
                style={{
                    height: (height - 70) + 'px'
                }}
                className="absolute top-0 bg-transLightPanel  dark:bg-transDarkPanel
                 w-full  border flex flex-row justify-around items-center">
                {children}
            </div>
        </>
    );
}





export { BlurPanel }