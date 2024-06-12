import * as tasks from "@/repo/tasks";

export async function GET() {
  try {
    const tasksList = await tasks.getTasks();
    return new Response(JSON.stringify(tasksList));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title } = body;
    const task = await tasks.addTask(title);
    return new Response(JSON.stringify(task), {
      status: 201, // Changed to 201 for successful POST request
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json().catch(() => ({})); // Ensure the JSON body has a field `id`
    await tasks.removeTask(id);
    return new Response(
      JSON.stringify({ message: "Task deleted successfully" }),
      {
        status: 200, // Use 200 OK for successful deletes
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export async function PATCH(request) {
  try {
    const { id, completed } = await request.json();
    const task = await tasks.updateTask(id, completed);
    return new Response(JSON.stringify(task), {
      status: 200, // Use 200 OK for successful updates
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
