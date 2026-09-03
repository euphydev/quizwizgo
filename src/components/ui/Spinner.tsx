const Spinner = () => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 m-auto h-16 w-16 animate-spin
      rounded-full border-4 border-solid border-ink-2 border-t-marquee"
    >
      <span className="sr-only">Loading</span>
    </div>
  );
};
export { Spinner };
