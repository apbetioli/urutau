'use client'

const GradientBackground = () => {
  return (
    <div>
      <div
        className="fixed w-screen h-screen -top-1/2 -left-1/2 -z-[1]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(168, 85, 247, 0.55) 0%, rgba(168, 85, 247, 0) 100%)',
        }}
      />
      <div
        className="fixed w-screen h-screen -bottom-1/2 -right-1/2 -z-[1]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(79, 70, 229, 0.35) 0%,rgba(79, 70, 229, 0) 100%)',
        }}
      />
    </div>
  )
}

export default GradientBackground
