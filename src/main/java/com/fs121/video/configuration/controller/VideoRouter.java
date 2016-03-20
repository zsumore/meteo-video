package com.fs121.video.configuration.controller;

import java.io.File;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;

import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.annotation.JsonView;
import com.fs121.video.configuration.domain.VideoList;

@Controller
@ConfigurationProperties(prefix = "fsvideo")
public class VideoRouter {

	@NotNull
	private String constVideoDir;

	@NotNull
	private String dailyVideoDir;

	public String getConstVideoDir() {

		return constVideoDir;
	}

	public void setConstVideoDir(String constVideoDir) {

		this.constVideoDir = constVideoDir;
	}

	public String getDailyVideoDir() {

		return dailyVideoDir;
	}

	public void setDailyVideoDir(String dailyVideoDir) {

		this.dailyVideoDir = dailyVideoDir;
	}

	@RequestMapping(path = "/dailyVideoList", method = RequestMethod.GET)
	@JsonView(VideoList.VideoListView.class)
	@ResponseBody
	public VideoList getDailyVideoList() {

		return new VideoList(getFileSort("/fsvideo/daily/", dailyVideoDir));
	}

	@RequestMapping(path = "/constVideoList", method = RequestMethod.GET)
	@JsonView(VideoList.VideoListView.class)
	@ResponseBody
	public VideoList getConstVideoList() {
		return new VideoList(getFileSort("/fsvideo/const/", constVideoDir));
	}

	/**
	 * @RequestMapping(path = "/dailyVideo/{fileName}.{ext}", method =
	 *                      RequestMethod.GET) public ResponseEntity
	 *                      <FileSystemResource> getDailyVideoFile(@PathVariable
	 *                      ("fileName") String fileName, @PathVariable("ext")
	 *                      String ext) { FileSystemResource resource = new
	 *                      FileSystemResource(new File(dailyVideoDir, fileName
	 *                      + "." + ext)); ResponseEntity
	 *                      <FileSystemResource> responseEntity = new
	 *                      ResponseEntity<>(resource, HttpStatus.OK); return
	 *                      responseEntity; }
	 * 
	 * @RequestMapping(path = "/constVideo/{fileName}.{ext}", method =
	 *                      RequestMethod.GET) public ResponseEntity
	 *                      <FileSystemResource> getConstVideoFile(@PathVariable
	 *                      ("fileName") String fileName, @PathVariable("ext")
	 *                      String ext) { FileSystemResource resource = new
	 *                      FileSystemResource(new File(constVideoDir, fileName
	 *                      + "." + ext)); ResponseEntity
	 *                      <FileSystemResource> responseEntity = new
	 *                      ResponseEntity<>(resource, HttpStatus.OK); return
	 *                      responseEntity; }
	 */
	/**
	 * 获取目录下所有文件(按时间排序)
	 * 
	 * @param path
	 * @return
	 */
	String[] getFileSort(String prefix, String path) {

		final long time = new Date().getTime();

		File[] files = new File(path).listFiles(new java.io.FilenameFilter() {
			public boolean accept(final File dir, final String name) {
				return name.endsWith(".mp4") && testLastModified(dir, name);
			}

			private boolean testLastModified(File dir, String name) {

				File temp = new File(dir, name);

				return Math.abs(temp.lastModified() - time) > 60000;
			}
		});

		String[] filesName = {};

		if (files != null && files.length > 0) {

			Arrays.sort(files, new Comparator<File>() {
				public int compare(File file, File newFile) {
					if (file.lastModified() < newFile.lastModified()) {
						return 1;
					} else if (file.lastModified() == newFile.lastModified()) {
						return 0;
					} else {
						return -1;
					}

				}
			});

			filesName = new String[files.length];

			for (int i = 0; i < files.length; i++) {
				filesName[i] = prefix + files[i].getName();
			}

		}

		return filesName;
	}

}
