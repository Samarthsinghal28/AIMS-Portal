const Loading = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="w-12 h-12 border-4 border-t-transparent bg-primary/90 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
