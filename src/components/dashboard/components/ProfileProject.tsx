import React from "react";

const ProfileProject = () => {
  return (
    <div>
      <section className="profile__project pt-26">
        <div className="flex justify-self-end">
          <label>
            Filter by status
            <select>
              <option value="Initiating">Initiating</option>
              <option value="Executing">Executing</option>
              <option value="Completed">Completed</option>
              <option value="Hosted">Hosted</option>
            </select>
          </label>
        </div>
      </section>
    </div>
  );
};

export default ProfileProject;
