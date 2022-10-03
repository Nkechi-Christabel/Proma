import React, { useState } from "react";

const ProfileProject = () => {
  const [value, setValue] = useState("Filter Projects by stages");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <section className="profile__project pt-28 p-3">
      <div className="flex justify-end">
        <select
          value={value}
          className="w-full max-w-fit p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none"
          onChange={(e) => handleChange(e)}
        >
          <option value="Filter Projects by stages" disabled selected>
            Filter Projects by stages
          </option>
          <option value="Initiating">Initiating</option>
          <option value="Executing">Executing</option>
          <option value="Completed">Completed</option>
          <option value="Hosted">Hosted</option>
        </select>
      </div>
    </section>
  );
};

export default ProfileProject;
