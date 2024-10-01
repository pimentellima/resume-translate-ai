export default function DemoVideo() {
    return (
        <video
            controls
            poster="/demo-poster.png"
            className="h-[400px] md:h-[570px] w-full rounded-md bg-background mt-10 md:mt-20"
        >
            <source src="https://resumes-app-fonts.s3.us-east-2.amazonaws.com/demo.mp4" />
            Your browser does not support the video tag.
        </video>
    )
}
