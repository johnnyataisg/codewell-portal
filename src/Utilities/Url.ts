const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

export const courseSlides = `${baseUrl}/api/v1/chapter?courseId=`
export const createUser = `${baseUrl}/api/v1/user/create`
export const homeData = `${baseUrl}/api/v1/learning/progress`
export const homeworkVideo = `${baseUrl}/api/v1/homework/videos?homeworkId=`
export const homeworkVideoByCourseId = `${baseUrl}/api/v1/homework/videos/course?courseId=`
export const login = `${baseUrl}/api/v1/auth/login`
export const logout = `${baseUrl}/api/v1/auth/logout`
export const sendEmail = `${baseUrl}/api/v1/auth/reset/sendEmail/`
export const resetPassword = `${baseUrl}/api/v1/auth/updateCredentials`
export const updateUser = `${baseUrl}/api/v1/user/update`
export const userData = `${baseUrl}/api/v1/user`
export const enrollments = `${baseUrl}/api/v1/enrollment`
