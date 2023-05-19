import { ProfileDataLoader } from "./fakeData";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, Await } from "react-router";

import TitleBar from "@/components/Title";
import ProfileTable from "@/pages/Profile/ProfileTable";

import { UserOutlined } from "@ant-design/icons";
import "./style.scss";
import Loading from "@/components/Loading";

const Profile = () => {
  const { t } = useTranslation();
  const { profileDataPromise } = useLoaderData() as ProfileDataLoader;

  return (
    <div className="Profile">
      <TitleBar title={t("protectedLayout.profile")} icon={<UserOutlined />} />
      <div className="Profile__content">
        <Suspense fallback={<Loading />}>
          <Await
            resolve={profileDataPromise}
            errorElement={<>Wrong</>}
            children={(profileData) => (
              <ProfileTable profileData={profileData} />
            )}
          ></Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Profile;
