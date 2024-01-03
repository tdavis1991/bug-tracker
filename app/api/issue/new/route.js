import { connectToDB } from "@/utils/database";
import Issue from "@/models/issue";
import User from "@/models/user";
import Project from "@/models/project";

export const POST = async (req) => {
  const { title, description, severity, attachments, userId } = await req.json();

  try {
    connectToDB();

    const existingUser = await User.findById(userId);

    if(!existingUser) {
      return new Response(JSON.stringify({ status: 404, message: 'Must sign in to create ticket' }));
    }

    const newIssue = Issue({
      title: title,
      description: description,
      severity: severity,
      attachments: attachments || [], // Ensure attachments array exists or initialize as an empty array
      createdBy: existingUser._id
    })

    // Save the attachments (if any) to the issue
    if (attachments && attachments.length > 0) {
      attachments.forEach((attachment) => {
        // Assuming attachment is an object with filename, mimeType, and path properties
        newIssue.attachments.push({
          filename: attachment.filename,
          mimeType: attachment.mimeType,
          path: attachment.path,
          uploadedBy: existingUser._id // Assuming the user who uploaded the attachment is logged in
        });
      });
    }

    await newIssue.save();
    return new Response(JSON.stringify({ status: 200, message: 'Issue successfully created!' }))
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, message: 'Something went wrong.' }))
  }
}