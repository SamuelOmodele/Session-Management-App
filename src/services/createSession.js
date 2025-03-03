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
    let origin_url = typeof window !== "undefined" ? window.location.origin : "";
    console.log(origin_url);
    let link = `${origin_url}/editor?fid=${fid}&hid=${hid}&tid=${tid}`;
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

export const fetchAllSession = async () => {
    const token = getAccessToken();
    try {
        const res = await axiosInstance.get(`web/session_manager`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (!res.data.status) {
            console.log("Failed to fetch sessions", res.data.message);
            return {status: false, message: res.data.message};;
        }

        return {status: true, message: res.data.payload.data};

    } catch (error) {
        console.log("Error fetching sessions:", error);
        return {status: false, message: error.message};
    }
};
export const fetchSingleSession = async (id) => {
    const token = getAccessToken();
    try {
        const res = await axiosInstance.get(`web/session_manager/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (!res.data.status) {
            console.log("Failed to fetch session", res.data.message);
            return {status: false, message: res.data.message};;
        }

        return {status: true, message: res.data.payload.data};

    } catch (error) {
        console.log("Error fetching sessions:", error);
        return {status: false, message: error.message};
    }
};
