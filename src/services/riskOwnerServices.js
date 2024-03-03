import axios from '../config/httpConfig';

export const getAllRiskOwners = async () => {
    try {
        const response = await axios.get('/risk-owners');
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getRiskOwnerById = async (id) => {
    try {
        const response = await axios.get(`/risk-owners/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const createRiskOwner = async (riskOwner) => {
    try {
        const response = await axios.post('/risk-owners', riskOwner);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const updateRiskOwner = async (riskOwner) => {
    try {
        const response = await axios.patch(`/risk-owners/${riskOwner.id}`, riskOwner);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteRiskOwner = async (id) => {
    try {
        const response = await axios.delete(`/risk-owners/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}
