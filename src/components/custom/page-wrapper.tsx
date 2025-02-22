export default function PageWrapper({
    children,
    pageName,
}: {
    children: React.ReactNode;
    pageName: string;
}) {
    return (
        <>
            <p className='text-2xl font-bold'>{pageName}</p>
            <div className='mt-4'>{children}</div>
        </>
    );
}
