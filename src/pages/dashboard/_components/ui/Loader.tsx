export default function Loader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            {title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
