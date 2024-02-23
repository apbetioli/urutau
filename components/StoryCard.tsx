import { Story } from '@prisma/client'

type Props = {
  story: Story
}

export default function StoryCard({ story }: Props) {
  const date = new Date(story.createdAt).toLocaleDateString()
  return (
    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      {story.image && (
        <img
          className="object-cover w-full h-64"
          src={story.image}
          alt={story.subject}
        />
      )}

      <div className="p-6">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            {date}
          </span>
          <p className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline">
            {story.subject}
          </p>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            {story.content.slice(
              story.subject.length + 1,
              story.subject.length + 100,
            )}
            ...
          </p>
        </div>
      </div>
    </div>
  )
}
