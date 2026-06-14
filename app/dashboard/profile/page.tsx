import ProfilePictureComponent from "./_components/profile-picture-component";
import ProfileFormComponent from "./_components/profile-form-component";

export default function ProfilePage() {
  return (
    <div className="w-full h-full flex flex-col items-center overflow-y-auto">
      <ProfilePictureComponent />
      <ProfileFormComponent />
    </div>
  );
}
