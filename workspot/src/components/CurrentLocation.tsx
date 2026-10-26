export const CurrentLocation = () => {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      {/* 바깥쪽 반투명 원 */}
      <div className="absolute h-10 w-10 rounded-full bg-primary/50 blur-sm" />

      {/* 안쪽 파란색 원 */}
      <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md">
        <div className="h-3 w-3 rounded-full bg-primary" />
      </div>
    </div>
  );
};