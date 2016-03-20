package com.fs121.video.configuration.domain;

import com.fasterxml.jackson.annotation.JsonView;

public class VideoList {
	
	public interface VideoListView {};
	
	private String[] data;

	public VideoList() {
		
	}

	public VideoList(String[] data) {
		
		this.data = data;
	}

	
	@JsonView(VideoListView.class)
	public String[] getData() {
		return data;
	}
	
	
	
	
	
	
	

}
