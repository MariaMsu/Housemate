const taskModel = require("../database/models/task");
const {assertKeysValid, pick} = require("./utilsForControllers");
const spaceController = require("./spaceController");

const returnableTaskFields = ['_id', 'spaceId', 'taskName', 'start_date', 'end_date', 'complexity', 'repetition', 'body', 'notification_type', 'notification_time', 'admin_approval'];

class TaskController {
    getTaskById = async (requestBody) => {
        assertKeysValid(requestBody, ['._id'], [])
        const task = await taskModel.findById(requestBody.taskId)
            .select(returnableTaskFields);
        if (!task) {
            return {error: {type: "TASK_NOT_FOUND", message: `There is no task for id=${requestBody.taskId}`}};
        }
        return task;
    };

    addTask = async (requestBody) => {
        assertKeysValid(requestBody, ['spaceId', 'start_date', 
            'end_date', 'complexity', 'repetition', 'body', 'notification_type', 
            'notification_time', 'admin_approval'])
        const task = await taskModel.create(requestBody);
        return pick(task, returnableTaskFields)
    };

    editTask = async (requestBody) => {
        assertKeysValid(requestBody, ['start_date', 
            'end_date', 'complexity', 'repetition', 'body', 'notification_type', 
            'notification_time', 'admin_approval', 'spaceId', 'taskId'])
        let updValues = structuredClone(requestBody)
        delete updValues._id
        return taskModel.findByIdAndUpdate(requestBody.taskId, {$set: updValues}, {new: true})
    }

    deleteTask = async (requestBody) => {
        assertKeysValid(requestBody, ['taskId'], [])
        const taskId = requestBody.taskId
        const task = await taskModel.findByIdAndDelete(taskId);
      
        if (!task) {
          return {
            error: { type: "TASK_NOT_FOUND", message: `There is no task for id=${"taskId"}` }
          };
        }
      
        return { success: true };
      };

    getTasksBySpaceId = async (requestBody) => {
        assertKeysValid(requestBody, ['spaceId'], [])
        const {spaceId} = requestBody;

        return taskModel.find({
            $and: [
                {spaceId: spaceId},
            ]
        }).select(returnableTaskFields)
    }
}

module.exports = new TaskController();
