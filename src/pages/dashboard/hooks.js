import {ref} from 'vue';
import dayjs from 'dayjs';
import {project} from "@/api";

export function useLoadList() {
  const loading = ref(true);
  const loadingFn = () => project.query();
  const loadFn = async () => {
    const { result } = await loadingFn();
    loading.value = false;
    result.forEach(res => {
      res.createdAt = dayjs(res.createdAt).format('YYYY-MM-DD HH:mm:ss')
      res.updatedAt = dayjs(res.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    })
    return result;
  };
  return {loading, loadFn}
}
