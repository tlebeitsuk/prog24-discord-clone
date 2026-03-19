type AvatarProps = {
  name: string
}

export default function Avatar({ name }: AvatarProps) {
  //const initials = name.slice(0, 2);
  const initials = name.split(" ").map((word) => word[0]).join("").slice(0, 2)

  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center uppercase font-bold">{initials}</div>
  )
}
