import ProfilePictureComponent from "./_components/profile-picture-component";
import ProfileFormComponent from "./_components/profile-form-component";

export default function ProfilePage() {
  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto py-24">
      <ProfilePictureComponent />
      <ProfileFormComponent />
    </div>
  );
}
