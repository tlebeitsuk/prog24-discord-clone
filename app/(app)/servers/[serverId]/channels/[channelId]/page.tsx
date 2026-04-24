import ChatSection from "@/app/components/ChatSection";

export default async function ChannelPage({
  params,
}: {
  params: { channelId: string }
}) {
  const {channelId} = await params 
  return <ChatSection channelId={channelId} />
}