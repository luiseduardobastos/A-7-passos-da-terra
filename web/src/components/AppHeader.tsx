interface AppHeaderInterface {
    title?: string
}

const AppHeader = ({title} : AppHeaderInterface) => {
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
