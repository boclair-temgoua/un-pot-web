import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { useRouter } from "next/router";
import { CreateOrUpdateFormAudioPost } from "@/components/post/create-or-update-form-audio-post";
import { CreateOrUpdateFormVideoPost } from "@/components/post/create-or-update-form-video-post";
import { CreateOrUpdateFormGalleryPost } from "@/components/post/create-or-update-form-gallery-post";
import { useAuth } from "@/components/util/context-user";
import { GetStaticPropsContext } from "next";
import { CreateOrUpdateFormAlbumPost } from "@/components/post/create-or-update-form-album-post";

const PostsCreate = () => {
  const { organizationId } = useAuth() as any;
  const { query } = useRouter();
  const { type, albumId } = query;

  return (
    <>
      <LayoutDashboard title={"Posts create"}>
        <div className="max-w-4xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            {organizationId && type === "article" ? <CreateOrUpdateFormPost organizationId={organizationId} /> : null}

            {organizationId && type === "audio" ? <CreateOrUpdateFormAudioPost organizationId={organizationId} /> : null}

            {organizationId && type === "video" ? <CreateOrUpdateFormVideoPost organizationId={organizationId} /> : null}

            {organizationId && type === "gallery" ? <CreateOrUpdateFormGalleryPost organizationId={organizationId} albumId={albumId as string} /> : null}

            {organizationId && type === "album" ? <CreateOrUpdateFormAlbumPost organizationId={organizationId} /> : null}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsCreate);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    }
  }
}