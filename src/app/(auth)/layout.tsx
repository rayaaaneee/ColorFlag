const SignLayout = ({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) => {
        return (
            <div className="w-full h-full grid grid-cols-[3fr_1fr]">
                {children}
            </div>
        );
}
  
export default SignLayout;
  