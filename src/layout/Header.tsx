import {
  FiSearch,
  FiBell,
  FiSun,
} from "react-icons/fi";

export default function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white shadow-sm px-8 py-5">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-1">
            {today}
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="relative">

            <FiSearch
              className="absolute left-4 top-3 text-gray-400"
            />

            <input
              placeholder="Search..."
              className="
              w-72
              rounded-full
              border
              pl-11
              pr-4
              py-2
              outline-none
              focus:border-blue-500
              "
            />

          </div>

          {/* Theme */}

          <button
            className="
            rounded-full
            bg-gray-100
            p-3
            hover:bg-blue-100
            transition
            "
          >
            <FiSun size={18} />
          </button>

          {/* Notification */}

          <button
            className="
            rounded-full
            bg-gray-100
            p-3
            hover:bg-blue-100
            transition
            relative
            "
          >
            <FiBell size={18} />

            <span
              className="
              absolute
              -top-1
              -right-1
              bg-red-500
              text-white
              text-xs
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
              "
            >
              3
            </span>

          </button>

          {/* Profile */}

          <div className="flex items-center gap-3">

            <img
              src="https://ui-avatars.com/api/?name=Tanmay"
              className="w-11 h-11 rounded-full"
              alt="profile"
            />

            <div>

              <h2 className="font-semibold">
                Tanmay
              </h2>

              <p className="text-sm text-gray-500">
                Admin
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}