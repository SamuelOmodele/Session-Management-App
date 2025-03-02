import createAxiosInstance from "../lib/axios";
const axiosInstance = createAxiosInstance();
import { getAccessToken } from "@/helpers/token";

export const createSession = async ({ sessionData }) => {

    try {
        const token = getAccessToken();
        const res = await axiosInstance.post(`web/app_session_manager`, {
            session_init: {
                language: sessionData.language,
                version: sessionData.version,
                start_duration: sessionData.startDateAndTime,
                end_duration: sessionData.endDateAndTime,
                session_name: sessionData.sessionName,
                allow_review: sessionData.allowReviewReport,
                invitation_expire: sessionData.invitationExpiryDuration,
            },
            questions: sessionData.questions,
            enrollment: sessionData.students
        },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (res.data.status) {
            const { fid, hid, tid } = res.data.payload.url;
            const { session_id } = res.data.payload.session;
            console.log('session created successfully')
            return updateSession(session_id, constructInvitationUrl(fid, hid, tid));
        } else {
            console.log('error creating session', res.data.message);
            return { status: false, message: res.data.message };
        }
    } catch (error) {
        console.log("Error creating session: ", error);
        return { status: false, message: error.message };
    }
};

const constructInvitationUrl = (fid, hid, tid) => {
    let link = `http://localhost:3000/editor?fid=${fid}&hid=${hid}&tid=${tid}`;
    console.log(link);
    return link;
}

export const updateSession = async (session_id, session_link) => {
    const token = getAccessToken();
    try {
        const res = await axiosInstance.post(`web/update_session_manager`, {
            session_id: session_id,
            student_link: session_link
        },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (!res.data.status) {
            console.log("Update session failed:", res.data.message);
            return {status: false, message: res.data.message};;
        }

        return {status: true, message: res.data.message};;

    } catch (error) {
        console.log("Error updating session:", error);
        return {status: false, message: error.message};;
    }
};
