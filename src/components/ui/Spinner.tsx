const Spinner = () => {
  return (
    <div
      className="absolute left-0 right-0 top-0 bottom-0 m-auto w-28 h-28 rounded-full animate-spin
      border border-solid border-slate-50 border-t-transparent"
    >
      <span className="sr-only">Loading</span>
    </div>
  );
};
export { Spinner };
